
import "./node.css";

function Node({col,isFinish,isStart}){
    

    const extraClassName = isFinish ? 'node-finish' : isStart ? 'node-start' : '';
    
    return(
        <div 
        className={`node ${extraClassName}`}
        ></div>
    );
}

export default Node;