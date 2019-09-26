import React from 'react'


function HomeSection(props) {


    return (
        <section className={props.SectionStyle} uk-scrollspy="cls:uk-animation-fade">
            <div className="uk-container">
                <div className={props.Style}>
                    <div>
                        {props.MiniTitle}
                        {props.Title}
                        {props.Subtitle}
                    </div>
                    <div>
                        <img src={props.ImageLink}>
                        </img>
                    </div>
                </div>
            </div>
        </section>
    )

}




export default HomeSection