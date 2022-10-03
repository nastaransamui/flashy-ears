declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SECRET_KEY: string;
      NEXT_PUBLIC_HOME_URL: string;
      NEXT_PUBLIC_ADMIN_URL: string;
      NEXT_PBULIC_FOLDER_PUBLIC_UAT: string;
      NEXT_PBULIC_FOLDER_PUBLIC_LIVE: string;
      NEXT_PUBLIC_API_LINK: string;
      NEXT_PUBLIC_HOME_VERCEL: string;
      NEXT_PUBLIC_ADMIN_VERCEL: string;
      NEXT_PUBLIC_SECRET_KEY: string;
      NEXT_PUBLIC_SERVERLESS: boolean;
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      PWD: string;
      NEXT_PUBLIC_USERNAME: string;
      NEXT_PUBLIC_MAP_KEY: string;
      NEXT_PUBLIC_PASSWORD: string;
      DATABASE_URL_UAT: string;
      DATABASE_URL_LIVE: string;
      S3_AWS_ACCESS_KEY: string;
      S3_AWS_SECRET: string;
      S3_AWS_BUCKET: string;
      S3_AWS_REGION: string;
      NEXT_PUBLIC_PUSHER_APPID: string;
      NEXT_PUBLIC_PUSHER_KEY: string;
      NEXT_PUBLIC_PUSHER_CLUSTER: string;
    }
  }
}

export {};
