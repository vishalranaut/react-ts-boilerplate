import { Row, Col, Card, Button, Spinner, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HomePageContent } from "../services/pageService";
import {
  ArrowRight,
  Layers,
  CheckCircle,
  Smartphone,
  Moon,
} from "lucide-react";

interface HomeProps {
  pageContent: HomePageContent | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const Home = ({
  pageContent,
  isLoading,
  error,
  isAuthenticated,
}: HomeProps) => {
  console.log("homepage content", pageContent);

  const getIconComponent = (iconName?: string) => {
    switch (iconName) {
      case "layers":
        return <Layers size={48} className="mb-3 text-primary" />;
      case "check-circle":
        return <CheckCircle size={48} className="mb-3 text-success" />;
      case "smartphone":
        return <Smartphone size={48} className="mb-3 text-info" />;
      case "moon":
        return <Moon size={48} className="mb-3 text-secondary" />;
      default:
        return <Layers size={48} className="mb-3 text-primary" />;
    }
  };

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "70vh" }}
      >
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5">
        <h2>Error Loading Content</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!pageContent) {
    return (
      <div className="text-center py-5">
        <h2>Error Loading Content</h2>
        <p>We couldn't load the page content. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="py-4 page-transition-enter page-transition-enter-active">
      {/* Sections Rendering */}
      {pageContent.sections.map((section, index) => {
        // Hero Section
        if (section.type === "hero") {
          return (
            <div
              key={index}
              className="rounded-3 p-5 mb-5 text-center position-relative overflow-hidden"
              style={{
                background: `linear-gradient(rgba(33, 33, 33, 0.85), rgba(33, 33, 33, 0.85)), url(${section.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "400px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1 className="display-5 fw-bold text-white mb-3">
                {section.title}
              </h1>
              {section.subtitle && (
                <p className="fs-4 text-light">{section.subtitle}</p>
              )}
              <p className="lead text-light mb-4">{section.message}</p>

              {section.callToAction && !isAuthenticated && (
                <Link to={section.callToAction.link}>
                  <Button
                    variant="primary"
                    size="lg"
                    className="px-4 py-2 d-inline-flex align-items-center"
                  >
                    {section.callToAction.text}
                    <ArrowRight size={18} className="ms-2" />
                  </Button>
                </Link>
              )}
            </div>
          );
        }

        // Features Section
        if (section.type === "features") {
          return (
            <div key={index} className="py-5">
              <h2 className="text-center mb-5">Key Features</h2>
              <Row xs={1} md={2} lg={4} className="g-4">
                {section.items.map((feature, featureIndex) => (
                  <Col key={featureIndex}>
                    <Card className="h-100 border-0 text-center p-4">
                      <Card.Body>
                        {getIconComponent(feature.icon)}
                        <Card.Title className="mb-3">
                          {feature.title}
                        </Card.Title>
                        <Card.Text>{feature.description}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          );
        }

        // Carousel Section
        if (section.type === "carousel") {
          return (
            <div key={index} className="py-5">
              <h2 className="text-center mb-4">Highlights</h2>
              <Carousel interval={3000} pause={false}>
                {section.items.map((item, itemIndex) => (
                  <Carousel.Item key={itemIndex}>
                    <img
                      src={item.image}
                      alt={item.caption}
                      className="d-block w-100"
                      style={{ maxHeight: "400px", objectFit: "cover" }}
                    />
                    <Carousel.Caption>
                      <h5>{item.caption}</h5>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          );
        }

        // CTA Section
        if (section.type === "cta") {
          return (
            <div key={index} className="text-center py-5">
              <h3 className="mb-3">{section.text}</h3>
              <div className="d-flex justify-content-center gap-3">
                {section.buttons.map((button, buttonIndex) => (
                  <Link key={buttonIndex} to={button.link}>
                    <Button
                      variant={
                        button.label === "Sign Up"
                          ? "primary"
                          : "outline-primary"
                      }
                      size="lg"
                    >
                      {button.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

export default Home;
