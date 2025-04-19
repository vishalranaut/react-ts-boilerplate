import { faker } from "@faker-js/faker";

export const generateMockData = () => {
  const users = Array.from({ length: 5 }, () => ({
    id: faker.string.uuid(),
    email: faker.internet.email(),
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
    createdAt: faker.date.past(),
  }));

  const settings = {
    home: {
      key: "home",
      theme: {
        primaryColor: "#0d6efd",
        background: "#f8f9fa",
      },
      sections: [
        {
          type: "hero",
          title: "Welcome to DynamicApp",
          subtitle: "A fully customizable web application",
          message: "Experience the power of dynamic content rendering",
          image:
            "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg",
          callToAction: {
            text: "Get Started",
            link: "/signup",
          },
        },
        {
          type: "features",
          items: [
            {
              title: "Dynamic Forms",
              description:
                "Forms that adapt to your needs, controlled by the backend",
              icon: "layers",
            },
            {
              title: "Custom Validation",
              description:
                "Validation rules defined by the backend for maximum flexibility",
              icon: "check-circle",
            },
            {
              title: "Responsive Design",
              description: "Looks great on any device, from mobile to desktop",
              icon: "smartphone",
            },
            {
              title: "Dark Theme",
              description: "Easy on the eyes with a beautiful dark theme",
              icon: "moon",
            },
          ],
        },
        {
          type: "carousel",
          items: [
            {
              image:
                "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg",
              caption: "Manage projects seamlessly",
            },
            {
              image:
                "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg",
              caption: "Collaborate in real time",
            },
            {
              image:
                "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg",
              caption: "Track progress easily",
            },
          ],
        },
        {
          type: "cta",
          text: "Join us today and explore all features",
          buttons: [
            {
              label: "Login",
              link: "/login",
            },
            {
              label: "Sign Up",
              link: "/signup",
            },
          ],
        },
      ],
    },

    login: {
      title: "Welcome Back",
      subtitle: "Sign in to your account",
      formFields: [
        {
          name: "email",
          label: "Email Address",
          type: "email",
          placeholder: "Enter your email",
          validation: {
            required: true,
            pattern: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
            message: "Please enter a valid email address",
          },
        },
        {
          name: "password",
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
          validation: {
            required: true,
            minLength: 6,
            message: "Password must be at least 6 characters",
          },
        },
      ],
      submitButtonText: "Sign In",
      alternateLink: {
        text: "Don't have an account? Sign up",
        link: "/signup",
      },
    },
    signup: {
      title: "Create Account",
      subtitle: "Join our community today",
      formFields: [
        {
          name: "name",
          label: "Full Name",
          type: "text",
          placeholder: "Enter your full name",
          validation: {
            required: true,
            minLength: 2,
            message: "Please enter your full name",
          },
        },
        {
          name: "email",
          label: "Email Address",
          type: "email",
          placeholder: "Enter your email",
          validation: {
            required: true,
            pattern: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
            message: "Please enter a valid email address",
          },
        },
        {
          name: "password",
          label: "Password",
          type: "password",
          placeholder: "Choose a password",
          validation: {
            required: true,
            minLength: 8,
            message: "Password must be at least 8 characters",
          },
        },
      ],
      submitButtonText: "Create Account",
      alternateLink: {
        text: "Already have an account? Sign in",
        link: "/login",
      },
    },
  };

  return {
    users,
    settings,
  };
};
