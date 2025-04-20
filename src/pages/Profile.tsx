import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { User, Settings } from "lucide-react";

interface ProfileProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  } | null;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  console.log("user", user);
  if (!user) return null;

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="border-0 shadow">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="rounded-circle mb-3"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: "120px", height: "120px" }}
                  >
                    <User size={48} className="text-white" />
                  </div>
                )}
                <h2 className="fw-bold">{user.name}</h2>
                <p className="text-muted">{user.email}</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
