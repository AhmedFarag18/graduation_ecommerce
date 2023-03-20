import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import TeamMember from '../components/TeamMember'
import member1 from "../assets/images/team/member-1.png"
import member2 from "../assets/images/team/member-2.png"
import member3 from "../assets/images/team/member-3.png"
import member4 from "../assets/images/team/member-4.png"

function Contact() {
    return (
        <>
            <Navbar />
            <section className='py-16'>
                <div className='container'>
                    <div className='text-center p-5 mb-8'>
                        <h1 className='text-3xl mb-3 font-bold text-indigo-500'>Meet our team members</h1>
                        <p className='text-neutral-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, sunt?Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, sunt?</p>
                    </div>
                    <div className='flex flex-wrap gap-3'>
                        <TeamMember img={member1} name="ahmed farag" job="Front end developer" />
                        <TeamMember img={member2} name="Abdelrahman Fathy" job="Back end developer" />
                        <TeamMember img={member3} name="ahmed saadawy" job="Android developer" />
                        <TeamMember img={member4} name="Hussein Ashraf" job="Ui/UX Designer" />
                        {/* <TeamMember img={member4} name="Hussein Ashraf" job="Ui/UX Designer" /> */}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Contact