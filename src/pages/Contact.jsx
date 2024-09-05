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
                        <TeamMember img={member1} links={["https://github.com/ahmedfarag18", "https://www.facebook.com/", "https://www.instagram.com/", "https://www.linkedin.com/in/ahmedfarag18/"]} name="ahmed farag" role="Front end Developer" description={"He is impressive Front end developer with above 2 years experiences in development websites"} />
                        <TeamMember img={member2} links={["https://github.com/AbdelrhmanFathy18", "https://www.facebook.com/", "https://www.instagram.com/", "https://www.linkedin.com/"]} name="Abdelrahman Fathy" role="Back end developer & ML.Net" description={"He is impressive Back end developer with 2 years experiences in Asp.net and API's"} />
                        <TeamMember img={member3} links={["https://github.com/ahmedfarag18", "https://www.facebook.com/", "https://www.instagram.com/", "https://www.linkedin.com/"]} name="ahmed saadawy" role="Odoo Developer" description={"Ahmed is a Odoo Developer have one year of experiences"} />
                        <TeamMember img={member4} links={["https://github.com/ahmedfarag18", "https://www.facebook.com/", "https://www.instagram.com/", "https://www.linkedin.com/"]} name="Hussein Ashraf" role="UI/UX Designer" description={"Hussien is a UI/UX Designer and writer have 1 year experiences in design"} />
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Contact