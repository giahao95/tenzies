import "./Die.css";

function Die(props) {
  const customStyle = {
    backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF",
  };

  return (
    <div className="die" style={customStyle} onClick={props.handleClick}>
      <h1>{props.value}</h1>
    </div>
  );
}

export default Die;
