import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import TeamMember from '../components/TeamMember'
import member1 from "../assets/images/team/member-1.png"
import member2 from "../assets/images/team/member-2.jpg"
import member3 from "../assets/images/team/member-3.jpg"
import member4 from "../assets/images/team/member-4.jpg"

function Contact() {
    return (
        <>
            <Navbar />
            <section className='py-16'>
                <div className='container'>
                    <div className='text-center p-5 mb-8'>
                        <h1 className='text-3xl mb-3 font-bold text-main-color'>Meet our team members</h1>
                        <p className='text-neutral-400'>You can contact with us, This project for Graduation</p>
                    </div>
                    <div className='flex flex-wrap gap-3'>
                        <TeamMember img={member1} links={["https://github.com/ahmedfarag18", "https://www.facebook.com/", "https://www.instagram.com/", "https://www.linkedin.com/"]} name="ahmed farag" job="Front end developer" />
                        <TeamMember img={member2} links={["https://github.com/AbdelrhmanFathy18", "https://www.facebook.com/", "https://www.instagram.com/", "https://www.linkedin.com/"]} name="Abdelrahman Fathy" job="Back end developer" />
                        <TeamMember img={member3} links={["https://github.com/ahmedfarag18", "https://www.facebook.com/", "https://www.instagram.com/", "https://www.linkedin.com/"]} name="ahmed saadawy" job="Data Entry" />
                        <TeamMember img={member4} links={["https://github.com/ahmedfarag18", "https://www.facebook.com/", "https://www.instagram.com/", "https://www.linkedin.com/"]} name="Hussein Ashraf" job="Writer" />
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Contact