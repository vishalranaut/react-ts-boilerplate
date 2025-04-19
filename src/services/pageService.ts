import { apiService } from "./api";

export interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    message?: string;
  };
}

export interface HomePageContent {
  key: string;
  theme?: {
    primaryColor?: string;
    background?: string;
  };
  sections: (
    | {
        type: "hero";
        title: string;
        subtitle?: string;
        message: string;
        image: string;
        callToAction?: {
          text: string;
          link: string;
        };
      }
    | {
        type: "features";
        items: {
          title: string;
          description: string;
          icon: string;
        }[];
      }
    | {
        type: "carousel";
        items: {
          image: string;
          caption: string;
        }[];
      }
    | {
        type: "cta";
        text: string;
        buttons: {
          label: string;
          link: string;
        }[];
      }
  )[];
}

export interface AuthPageContent {
  key: string;
  title: string;
  subtitle?: string;
  formFields: FormField[];
  submitButtonText: string;
  alternateLink?: {
    text: string;
    link: string;
  };
  footerText?: string;
}

export const pageService = {
  getPageContent: async (
    pageKey: string
  ): Promise<HomePageContent | AuthPageContent> => {
    const response = await apiService.get<{
      pages: Record<string, HomePageContent | AuthPageContent>;
    }>("/settings");
    return response.pages[pageKey];
  },

  getHomePageContent: async (): Promise<HomePageContent> => {
    return pageService.getPageContent("home") as Promise<HomePageContent>;
  },

  getLoginPageContent: async (): Promise<AuthPageContent> => {
    return pageService.getPageContent("login") as Promise<AuthPageContent>;
  },

  getSignupPageContent: async (): Promise<AuthPageContent> => {
    return pageService.getPageContent("signup") as Promise<AuthPageContent>;
  },
};
