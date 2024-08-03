"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAIModal'
import { LoaderCircle } from 'lucide-react'
import { db } from '@/utils/db'
import { PrepPal } from '@/utils/schema'
import { v4 } from 'uuid'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false)
    const [jobPosition, setJobPosition] = useState();
    const [jobDesc, setJobDesc] = useState();
    const [jobExperience, setJobExperience] = useState();
    const [loading, setLoading] = useState(false);
    const [JsonResponse, setJsonResponse]= useState([])
    const {user} = useUser()

    const onSubmit=async(e) => {
        setLoading(true)
        e.preventDefault()
        console.log(jobPosition, jobDesc, jobExperience);
        const InputPrompt = "Generate a set of " + process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT + " interview questions and answers for a candidate applying for the position of " + jobPosition + " with " + jobExperience + " years of experience. The candidate will be expected to work with " + jobDesc + " technologies and tools. Include a mix of technical and soft skills questions. Provide detailed answers that are relevant to the role. The generated output should be in JSON format with 'Question' and 'Answer' as fields.";
        const result= await chatSession.sendMessage(InputPrompt)
        const MockJsonResp=(result.response.text()).replace('```json', '').replace('```', '')
        console.log(JSON.parse(MockJsonResp));
        setJsonResponse(MockJsonResp)

        if (MockJsonResp){
        const resp = await db.insert(PrepPal)
        .values({
            mockId:uuidv4(),
            jsonPrepResp: MockJsonResp,
            jobPosition: jobPosition,
            jobDesc: jobDesc,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD-MM-yyyy')
        }).returning({mockId:PrepPal.mockId});
    
        console.log("Inserted ID:", resp);
        }
        else{
            console.log("Error");
        }
        setLoading(false);
        
    }
  return (
    <div>
        <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer 
        transition-all'
        onClick={() => setOpenDialog(true)}>
            <h2 className='font-bold text-lg text-center'>+ Add New</h2>
        </div>
        <Dialog open={openDialog}>
        <DialogContent className='max-w-2xl'>
            <DialogHeader>
            <DialogTitle className='font-2xl'>Tell us more about your Job Interview</DialogTitle>
            <DialogDescription>
            <form onSubmit={onSubmit}>
                <div>
                    <h2>Describe Your Job Position/Role, Job Description, and Years of Experience</h2>
                    <div className='mt-7 my-3'>
                        <label>Job Role/Job Position</label>
                        <Input placeholder="Ex. Full Stack Developer" required
                        onChange={(event)=>setJobPosition(event.target.value)}/>
                    </div>
                    <div className='my-3'>
                        <label>Job Description and Tech Stack (Brief Summary)</label>
                        <Textarea placeholder="Ex. React, NodeJS, Angular, MySQL, etc" required
                        onChange={(event)=>setJobDesc(event.target.value)}/>
                    </div>
                    <div className='my-3'>
                        <label>Years of Experience</label>
                        <Input placeholder="Ex. 5" type="number" max="70" required
                        onChange={(event)=>setJobExperience(event.target.value)}/>

                    </div>
                </div>
            <div className='flex gap-5 justify-end'>
                <Button type="button" variant="ghost" onClick={()=>setOpenDialog(false)}>Cancel</Button>
                <Button type="submit" disabled={loading}>
                    {loading?
                    <>
                    <LoaderCircle className="animate-spin"/>'Generating interview questions. Please wait!' 
                    </>: 'Start Interview'    
                    }
                    </Button>
            </div>
            </form>
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>

    </div>
  )
}

export default AddNewInterview