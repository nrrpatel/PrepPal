"use client";
import React, { useEffect, useState } from 'react';
import { db } from '@/utils/db';
import { PrepPal } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import QuestionsSection from './_component/QuestionsSection';
import RecordAnsSection from './_component/RecordAnsSection';

function StartInterview({ params }) {
    const [interviewData, setInterviewData] = useState(null);
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
    const [activeQuestionIndex, setActiveQuestionIndex]=useState(0)
    
    useEffect(() => {
        GetInterviewDetails();
    }, []);

    const GetInterviewDetails = async () => {
        try {
            const result = await db.select().from(PrepPal).where(eq(PrepPal.prepId, params.interviewId));
            if (result.length > 0) {
                const interview = result[0];
                setInterviewData(interview);

                const jsonMockResp = JSON.parse(interview.jsonPrepResp);
                console.log(jsonMockResp);
                setMockInterviewQuestion(jsonMockResp);
            } else {
                console.error("No interview data found");
            }
        } catch (error) {
            console.error("Error fetching interview details:", error);
        }
    };

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2'>
                {/* Questions */}
                <QuestionsSection 
                mockInterviewQuestion={mockInterviewQuestion}
                activeQuestionIndex={activeQuestionIndex} />

                {/* Video/Audio Recording */}
                <RecordAnsSection/>
            </div>
        </div>
    );
}

export default StartInterview;
