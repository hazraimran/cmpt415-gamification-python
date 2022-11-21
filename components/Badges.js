import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faCertificate, faAward, faMedal, faStar } from "@fortawesome/free-solid-svg-icons";


function handleAlert1(e){
    alert("Attempting a question every day for a week");
}

function handleAlert2(e){
    alert("Getting 5 consecutive question correct on the first try");
}

const Badges = (props)=> {
    return (
        <div>
            <h1><center>Badges</center>
            </h1>
            <Grid>
                <Row>
                    <Col size={1}>
                        <center><FontAwesomeIcon icon={faMedal} size="3x" /></center>
                        <center><h5 onMouseOver={handleAlert1}>Active Badge</h5></center>
                       
                    </Col>
                    <Col size={1}>
                        <center><FontAwesomeIcon icon={faStar} size="3x"/></center>
                        <center><h5 onMouseOver={handleAlert2}>Streak Badge</h5></center>
                        <center><h6>Getting 5 consecutive question correct on the first try</h6></center>
                    </Col>
                    <Col size={1}>
                        <center><FontAwesomeIcon icon={faTrophy} size="3x"/></center>
                        <center><h5>Master Badge</h5></center>
                        <center><h6>Reaching the Max Level (10000 pts)</h6></center>
                    </Col>
                    <Col size={1}>
                        <center><FontAwesomeIcon icon={faCertificate} size="3x"/></center>
                        <center><h5>Learner Badge</h5></center>
                        <center><h6>Reattempting 5 questions correctly after interactive feedback</h6></center>
                    </Col>
                    <Col size={1}>
                        <center><FontAwesomeIcon icon={faAward} size="3x"/></center>
                        <center><h5>Concept Badge</h5></center>
                        <center><h6>Mastering a concept can get a badge (Conditional statement badge, Loop badge)</h6></center>
                    </Col>
                </Row>
            </Grid>
        </div>
    )
}

export default Badges;

export const Grid = styled.div`
`;

export const Row = styled.div`
    display: flex;
`;

export const Col = styled.div`
    flex: ${(props) => props.size};
`;