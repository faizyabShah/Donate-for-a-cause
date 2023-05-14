import { Card } from 'react-bootstrap';
import './CardComponent.scss'

function CardComponent(props) {
  return (
    <Card style={{ width: '18rem' }}>
      {/* <Card.Img variant="top" src={props.imageUrl} /> */}
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.text}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CardComponent;