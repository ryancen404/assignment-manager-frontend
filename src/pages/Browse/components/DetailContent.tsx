import React from 'react';
import { Class } from '../../../types';


export interface DetailContentProps {
    classInfo: Class
}

const DetailContent: React.FC<DetailContentProps> = (props: DetailContentProps) => {
    const students = props.classInfo.students;
    
    return (
        <div>
            Content
        </div>
    )
}

export default DetailContent;