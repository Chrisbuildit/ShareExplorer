import React from 'react';
import './Home.css'


function Home({company}) {



    return (
        <div className='Glacier'>
            <section className="Home">
                <>
                <h3>Welcome on this website</h3>
                <p>Here you can find the most important data for company shares while enjoying beautiful mountain scenery. </p>
                <p>You will be provided with a trading advice on each share. Please note that you can only perform 5 searches per minute for now.</p>
                </>
            </section>
        </div>
    );
}

export default Home;