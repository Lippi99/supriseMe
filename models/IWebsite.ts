interface IWebsiteMessages {
  message: string;
  image: string;
}
export interface IWebsite {
  id: number;
  active: boolean;
  userEmail: string;
  plan: string;
  name: string;
  guid: string;
  theme: string;
  songUrl: string;
  messages: IWebsiteMessages[];
  image: string;
  customThemeImage?: string;
}

export interface IWebsiteClient {
  website: IWebsite;
}

export interface IWebsiteActiveClients {
  websites: IWebsite[];
}
