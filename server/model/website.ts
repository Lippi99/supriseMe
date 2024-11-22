interface IWebsiteMessages {
  message: string;
  image: string;
}
export interface IWebsite {
  userEmail: string;
  name: string;
  theme: string;
  messages: IWebsiteMessages[];
  image: string;
}
