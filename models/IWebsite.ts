interface IWebsiteMessages {
  message: string;
  image: string;
}
export interface IWebsite {
  userEmail: string;
  plan: string;
  name: string;
  theme: string;
  messages: IWebsiteMessages[];
  image: string;
}

export interface IWebsiteClient {
  website: IWebsite;
}
