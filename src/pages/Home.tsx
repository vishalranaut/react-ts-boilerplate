import { Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { HomePageContent } from '../services/pageService';
import { ArrowRight, Layers, CheckCircle, Smartphone, Moon } from 'lucide-react';

interface HomeProps {
  pageContent: HomePageContent | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const Home = ({ pageContent, isLoading, error, isAuthenticated }: HomeProps) => {
  const getIconComponent = (iconName?: string) => {
    switch (iconName) {
      case 'layers':
        return <Layers size={48} className="mb-3 text-primary" />;
      case 'check-circle':
        return <CheckCircle size={48} className="mb-3 text-success" />;
      case 'smartphone':
        return <Smartphone size={48} className="mb-3 text-info" />;
      case 'moon':
        return <Moon size={48} className="mb-3 text-secondary" />;
      default:
        return <Layers size={48} className="mb-3 text-primary" />;
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
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
      <div 
        className="rounded-3 p-5 mb-5 text-center position-relative overflow-hidden"
        style={{
          background: `linear-gradient(rgba(33, 33, 33, 0.85), rgba(33, 33, 33, 0.85)), url(${pageContent.heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <h1 className="display-5 fw-bold text-white mb-3">{pageContent.title}</h1>
        {pageContent.subtitle && (
          <p className="fs-4 text-light">{pageContent.subtitle}</p>
        )}
        <p className="lead text-light mb-4">{pageContent.welcomeMessage}</p>
        
        {pageContent.callToAction && !isAuthenticated && (
          <Link to={pageContent.callToAction.link}>
            <Button variant="primary" size="lg" className="px-4 py-2 d-inline-flex align-items-center">
              {pageContent.callToAction.text}
              <ArrowRight size={18} className="ms-2" />
            </Button>
          </Link>
        )}
      </div>

      {pageContent.features && (
        <div className="py-5">
          <h2 className="text-center mb-5">Key Features</h2>
          <Row xs={1} md={2} lg={4} className="g-4">
            {pageContent.features.map((feature, index) => (
              <Col key={index}>
                <Card className="h-100 border-0 text-center p-4">
                  <Card.Body>
                    {getIconComponent(feature.icon)}
                    <Card.Title className="mb-3">{feature.title}</Card.Title>
                    <Card.Text>{feature.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
      
      <div className="text-center py-5">
        <h3 className="mb-3">Ready to explore?</h3>
        <p className="mb-4">
          This application demonstrates dynamic content loaded from APIs. The layout, text, and functionality 
          can all be changed from the backend without modifying frontend code.
        </p>
        {!isAuthenticated && (
          <div className="d-flex justify-content-center gap-3">
            <Link to="/login">
              <Button variant="outline-primary" size="lg">Log In</Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary" size="lg">Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;