import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class MovieCard extends React.Component {
    render() {
        const {movie, onClick} = this.props;
        return (
//REACT-BOOTSTRAP COMPONENTS
            <Card style={{width:'16rem'}}>
                <Card.Img variant="top" src={movie.ImageURL}/>
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Button onClick={ () => onClick(movie)} variant="link">Open</Button>
                </Card.Body>
            </Card>
        );
    }
}

//HTML COMPONENTS
//stuff for HTML components (would go under render() { ... return ( )}, instead of card stuff)
            // <div
            // onClick={() => onClick(movie)}
            // className="movie-card">
            //     {movie.Title}
            // </div>
//actual component - would go down here at bottom
// MovieCard.propTypes = {
//     movie: PropTypes.shape({
//         Title: PropTypes.string.isRequired,
//         Description: PropTypes.string.isRequired,
//         ImageURL: PropTypes.string.isRequired
//     }).isRequired,
//     onClick: PropTypes.func.isRequired
// };