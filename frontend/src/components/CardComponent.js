import { Card } from 'react-bootstrap';
import './CardComponent.scss';

function CardComponent(props) {
  return (
    <Card style={{ border: "none" }} {...props}>
      {props.hasImage ? (<Card.Img variant="top" src={`../Images/${props.imageName}`} />) : null}
      
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.text}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CardComponent;
