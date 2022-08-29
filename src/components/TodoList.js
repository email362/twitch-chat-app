import React, { useEffect, useState } from "react";
import Todo from "./Todo";

const TodoList = ({data}) => {
    return (
        <div>
            {data.map(item => {
               return (<Todo content={item} />)
            })}
        </div>
    );
};

export default TodoList;