import { Card } from "react-bootstrap";
import "./CardComponent.scss";

function ExampleCard({ title, body, footer }) {
  return (
    <Card>
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Text>{body}</Card.Text>
      </Card.Body>
      <Card.Footer>{footer}</Card.Footer>
    </Card>
  );
}

export default ExampleCard;
