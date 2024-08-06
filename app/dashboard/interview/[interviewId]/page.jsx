"use client";
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { PrepPal } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';

function Interview({ params }) {
    const [interviewData, setInterviewData] = useState(null);
    const [webCamEnabled, setWebCamEnabled] = useState(false);

    useEffect(() => {
        console.log(params.interviewId);
        GetInterviewDetails();
    }, []);

    const GetInterviewDetails = async () => {
        const result = await db.select().from(PrepPal).where(eq(PrepPal.prepId, params.interviewId));
        setInterviewData(result[0]);
    };

    return (
        <div className="my-10">
            <h2 className="font-bold text-2xl">Let's Get Started</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col my-7 gap-5">
                    {interviewData ? (
                        <div className="flex flex-col p-6 rounded-lg border gap-5">
                            <h2 className="text-lg">
                                <strong>Job Position/Role: </strong>{interviewData.jobPosition}
                            </h2>
                            <h2 className="text-lg">
                                <strong>Job Description and Tools: </strong>{interviewData.jobDesc}
                            </h2>
                            <h2 className="text-lg">
                                <strong>Years of Experience: </strong>{interviewData.jobExperience}
                            </h2>
                        </div>
                    ) : (
                        <div>Loading interview details...</div>
                    )}
                    <div className="p-5 border gap-5 rounded-lg border-yellow-300 bg-yellow-100">
                        <h2 className="flex gap-2 items-center text-purple-700">
                            <Lightbulb /><strong>Information</strong>
                        </h2>
                        <h2 className="mt-3 text-purple-700">{process.env.NEXT_PUBLIC_INFORMATION}</h2>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    {webCamEnabled ? (
                        <Webcam
                            onUserMedia={() => setWebCamEnabled(true)}
                            onUserMediaError={() => setWebCamEnabled(false)}
                            mirrored={true}
                            style={{
                                height: 550,
                                width: 550,
                                marginTop: -38
                            }}
                        />
                    ) : (
                        <>
                            <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
                            <Button variant="secondary" className="w-full mb-3" onClick={() => setWebCamEnabled(true)}>Enable Webcam and Microphone</Button>
                        </>
                    )}
                    <Button className="color-primary w-full mt-1">Start Interview</Button>
                </div>
            </div>
        </div>
    );
}

export default Interview;
