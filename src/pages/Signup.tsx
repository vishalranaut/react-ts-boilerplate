import { Card, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthPageContent } from '../services/pageService';
import DynamicForm from '../components/DynamicForm';

interface SignupProps {
  pageContent: AuthPageContent | null;
  isLoading: boolean;
  error: string | null;
  onSubmit: (formData: Record<string, any>) => Promise<void>;
}

const Signup = ({ pageContent, isLoading, error, onSubmit }: SignupProps) => {
  if (!pageContent) {
    return (
      <Container className="py-5">
        <Alert variant="danger">Error loading page content</Alert>
      </Container>
    );
  }

  return (
    <Container className="auth-container page-transition-enter page-transition-enter-active">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={6}>
          <Card className="auth-card shadow border-0">
            <Card.Body className="p-4 p-md-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold">{pageContent.title}</h2>
                {pageContent.subtitle && <p className="text-muted">{pageContent.subtitle}</p>}
              </div>

              {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

              <DynamicForm
                fields={pageContent.formFields}
                submitButtonText={pageContent.submitButtonText}
                onSubmit={onSubmit}
                isLoading={isLoading}
              />

              {pageContent.alternateLink && (
                <div className="text-center mt-4">
                  <Link to={pageContent.alternateLink.link}>
                    {pageContent.alternateLink.text}
                  </Link>
                </div>
              )}

              {pageContent.footerText && (
                <div className="text-muted text-center mt-4 small">
                  {pageContent.footerText}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;