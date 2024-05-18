import { Injectable, NotFoundException } from '@nestjs/common';
import OpenAIApi from 'openai';
import config from '../../config';
import { ChatCompletion, ChatCompletionMessageParam } from 'openai/resources';
import { left, right } from '@sweet-monads/either';
import * as cheerio from 'cheerio';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../app/user/entities/user.entity';
import { Repository } from 'typeorm';
import { AppError } from '../../common/error/app-error';
import { TokenTrackerEntity } from '../../app/ai/entity/tokenTracker.entity';


interface DataBlock {
  text?: string;
  level?: number;
  style?: string;
  items?: string[];
}

@Injectable()
export class OpenaiApi {
  public openai: OpenAIApi;


  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(TokenTrackerEntity)
    private tokenTrackerRepository: Repository<TokenTrackerEntity>
  ) {
    this.openai = new OpenAIApi({ apiKey: config.openAiSecretKey });
  }


  async openaiGeneration(uid: string, data) {


    const history = data.messages.map(
      (message): ChatCompletionMessageParam => ({
        role: message.ai ? 'assistant' : 'user',
        content: `You are a talented writer and SEO specialist. Write a full article on ${data.theme} for ${data.textFor}, additionally using the following headings: ${data.titles?.join()}. Also for SEO, use ${data.keyWords?.join()} keywords. The language of the text must be ${data.language}.
                     Please return the text in html format.
                     Provide detailed and informative content with lists, if any, under each subheading, divided into clear and concise paragraphs.`,
      }),
    );

    // console.log(data.language);
    const completion: ChatCompletion = await this.openai.chat.completions.create({
      model: data.model,
      messages: [
        {
          role: 'system',
          content: data.prompt,
        },
        ...history,
      ],
      max_tokens: 3000,
      temperature: data.temperature,
      top_p: 0.5,
      frequency_penalty: data.frequency_penalty,
      presence_penalty: data.presence_penalty,
      n: data.n,
      stream: data.stream,
      logprobs: data.logprobs,
    });

    try {

      const user = await this.userRepository.findOne({ where: { uid: uid } });
      if (!user) {
        return left(new AppError('User not found'));
      }

      const tokenTracker = await this.tokenTrackerRepository.findOne({ where: { user_uid: uid } });
      if (!tokenTracker) {
        await this.tokenTrackerRepository.save({ user_uid: uid, token: 1 });
      } else {
        let num = (+tokenTracker.token) + 1
        const mergedProviderToken = this.tokenTrackerRepository.merge(tokenTracker, { token: num });
        await this.tokenTrackerRepository.save(mergedProviderToken);
      }

      let currentArticles = (+user.articles) - 1;
      const mergedProvider = this.userRepository.merge(user, { articles: currentArticles });
      await this.userRepository.save(mergedProvider);

      const [content] = completion.choices.map((choice) => choice.message.content);

      const $ = cheerio.load(content);
      const elements = $('h1, h2, h3, h4, h5, h6, p, ul');
      const jsonObjects = {
        time: 1709114611185,
        blocks: [],
      };

      elements.each((index, element) => {
        const tag = $(element).get(0).tagName;
        let type;
        let level;
        let style;
        let items = [];

        if (tag === 'p' || tag.startsWith('h') && tag.length === 2) {
          let htmlContent = $(element).html(); // Извлекаем HTML-содержимое
          // Заменяем <strong> на <b> в HTML-содержимом
          if (htmlContent) {
            htmlContent = htmlContent.replace(/<strong>/g, '<b>').replace(/<\/strong>/g, '</b>');
          }

          if (tag === 'p') {
            type = 'paragraph';
          } else if (tag.startsWith('h')) {
            type = 'header';
            level = parseInt(tag[1]);
          }

          const block: {
            type: string;
            data: DataBlock;
          } = {
            type,
            data: {}
          };

          // Для заголовков и параграфов сохраняем обработанное HTML-содержимое
          block.data.text = htmlContent;

          if (type === 'header' && level) {
            block.data.level = level;
          }

          jsonObjects.blocks.push(block);
        } else if (tag === 'ul' || tag === 'ol') {
          type = 'list';
          style = tag === 'ul' ? 'unordered' : 'ordered';
          items = $(element).find('li').map((idx, li) => {
            // Обрабатываем HTML-содержимое каждого <li>, заменяем <strong> на <b>
            let liHtml = $(li).html();
            return liHtml.replace(/<strong>/g, '<b>').replace(/<\/strong>/g, '</b>');
          }).get();

          jsonObjects.blocks.push({
            type,
            data: {
              style,
              items
            }
          });
        }
      });

      // elements.each((index, element) => {
      //   const tag = $(element).get(0).tagName;
      //   // const text = $(element).text().trim();
      //   // const type = tag === 'p' ? 'paragraph' : 'header';
      //   let type;
      //   let level;
      //   let style;
      //   let items = [];
      //
      //
      //   if (tag === 'p') {
      //     type = 'paragraph';
      //   } else if (tag.startsWith('h') && tag.length === 2) {
      //     type = 'header';
      //     level = parseInt(tag[1]);
      //   } else if (tag === 'ul' || tag === 'ol') {
      //     type = 'list';
      //     style = tag === 'ul' ? 'unordered' : 'ordered';
      //     items = $(element).find('li').map((idx, li) => $(li).text().trim()).get(); // Собираем текст каждого элемента списка
      //   }
      //
      //   const block: {
      //     type: string,
      //     data: DataBlock
      //   } = {
      //     type,
      //     data: {}
      //   };
      //
      //   if (type === 'list') {
      //     block.data.items = items;
      //     block.data.style = style;
      //   } else if (type === 'header') {
      //     block.data.level = level;
      //     block.data.text = $(element).text().trim();
      //   } else if (type === 'paragraph') {
      //     block.data.text = $(element).text().trim();
      //   }
      //
      //
      //   jsonObjects.blocks.push(block);
      // });

      // console.log(content);
      return right(jsonObjects);
    } catch (e) {
      return left('Failed request to ChatGPT');
    }
  }

  async getTokenTracker(uid: string) {
    const tokenTracker = await this.tokenTrackerRepository.findOne({ where: { user_uid: uid } });
    if (!tokenTracker) {
      throw new NotFoundException('Token Tracker not found');
    }
    return tokenTracker;
  }
}
