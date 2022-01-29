import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import DetailModal from '../DetailModal/DetailModal';
import Lottie from 'react-lottie';
import animationData from '../../Image/loading.json';

const FullStack = () => {
    const { categoryPath } = useParams();
    
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectsFiltered, setProjectsFiltered] = useState([]);
    const [details, setDetails] = useState({});

    const allProjects = useSelector((state) => state.projects.projectsList);
    const allReviews = useSelector((state) => state.projects.reviewsList);
    
    useEffect(() => {
        let filteredProjects;
        if(categoryPath === undefined) {
            filteredProjects  = allProjects.filter(project =>  project.category === 'full-stack');
        }else{
            filteredProjects  = allProjects.filter(project =>  project.category === categoryPath);
        }
        setProjectsFiltered(filteredProjects);
        setIsLoading(false);
    }, [categoryPath, allProjects, allReviews])
    
    const handleModal = (project) => {
        setDetails(project);
        setIsModalOpen(true);

        const modalContainer = document.getElementById('modal-container');
        modalContainer.classList.add('show-modal');
    }

    const defaultOptions = {
		loop: true,
		autoplay: true, 
		animationData: animationData,
		rendererSettings: {
		  preserveAspectRatio: 'xMidYMid slice'
		}
	};

    return (
        <>
            <div className="counts">
                <p>Total Projects: {allProjects.length}</p>
                <p>Now Showing: {projectsFiltered.length}</p>
            </div>

            <div className="app__inside">
                {
                    isLoading &&    <div className="loader">
                                        <div>
                                            <Lottie options={defaultOptions}
                                                    height={100}
                                                    width={100}/>
                                            <h2 className="bar--18 text--center">
                                                RASHA'21
                                            </h2>
                                        </div>
                                    </div>
                }

                {
                    !isLoading && projectsFiltered.map((project) => (
                                    <div className="app__single" key={project._id}>
                                        <button className="reg--24" onClick={() => handleModal(project)}>
                                            <img src={project.logo} alt="logo"/>
                                            <p className="lit--18">{project.title}</p>
                                        </button>
                                    </div>
                    ))
                }
            </div>
            <section className="modal__container" id="modal-container">
                {
                    isModalOpen && <DetailModal details={details} key={details._id} setIsModalOpen={setIsModalOpen}/>
                }
            </section>
        </>
    );
};

export default FullStack;