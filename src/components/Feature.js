import React, { Fragment } from 'react';

// Don't touch this import
import { fetchQueryResultsFromTermAndValue } from '../api';

/**
 * We need a new component called Searchable which:
 * 
 * Has a template like this:
 * 
 * <span className="content">
 *  <a href="#" onClick={async (event) => {}}>SOME SEARCH TERM</a>
 * </span>
 *
 * You'll need to read searchTerm, searchValue, setIsLoading, and setSearchResults off of the props.
 * 
 * When someone clicks the anchor tag, you should:
 * 
 * - preventDefault on the event
 * - call setIsLoading, set it to true
 * 
 * Then start a try/catch/finally block:
 * 
 * try:
 *  - await the result of fetchQueryResultsFromTermAndValue, passing in searchTerm and searchValue
 *  - send the result to setSearchResults (which will update the Preview component)
 * catch: 
 *  - console.error the error
 * finally:
 *  - call setIsLoading, set it to false
 */
const Searchable = (props) => {
    const {searchTerm, searchValue, setIsLoading, setSearchResults} = props;

    const handleClick = async (event) => {
        setIsLoading(true);
        try{
            const results = await fetchQueryResultsFromTermAndValue(searchTerm, searchValue);
            setSearchResults(results);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <span className='content'>
            <a href='#' onClick={handleClick}>
                {searchValue}
            </a>
        </span>
    );
};

/**
 * We need a new component called Feature which looks like this when no featuredResult is passed in as a prop:
 * 
 * <main id="feature"></main>
 * 
 * And like this when one is:
 * 
 * <main id="feature">
 *   <div className="object-feature">
 *     <header>
 *       <h3>OBJECT TITLE</h3>
 *       <h4>WHEN IT IS DATED</h4>
 *     </header>
 *     <section className="facts">
 *       <span className="title">FACT NAME</span>
 *       <span className="content">FACT VALUE</span>
 *       <span className="title">NEXT FACT NAME</span>
 *       <span className="content">NEXT FACT VALUE</span>
 *     </section>
 *     <section className="photos">
 *       <img src=IMAGE_URL alt=SOMETHING_WORTHWHILE />
 *     </section>
 *   </div>
 * </main>
 * 
 * The different facts look like this: title, dated, images, primaryimageurl, description, culture, style, 
 * technique, medium, dimensions, people, department, division, contact, creditline
 * 
 * The <Searchable /> ones are: culture, technique, medium (first toLowerCase it), and person.displayname (one for each PEOPLE)
 * 
 * NOTE: people and images are likely to be arrays, and will need to be mapped over if they exist
 * 
 * This component should be exported as default.
 */
const Feature = (props) => {
const {featuredResult} = props;
return(
    <main id='feature'>
        {featuredResult ? (
            <div className="object-feature">
                <header>
                    <h3>{featuredResult.title}</h3>
                    <h4>{featuredResult.dated}</h4>
                </header>
                <section className='facts'>
                    <span className='title'>FACT NAME</span>
                    <span className='content'>{featuredResult.description}</span>
                    <span className='title'>Culture</span>
                    <span className='content'>{featuredResult.culture}</span>
                    <span className='title'>Style</span>
                    <span className='content'>{featuredResult.style}</span>
                    <span className='title'>Technique</span>
                    <span className='content'>{featuredResult.technique}</span>
                    <span className='title'>Medium</span>
                    <span className='content'>{featuredResult.medium}</span> 
                    <span className='title'>Dimensions</span>
                    <span className='content'>{featuredResult.dimensions}</span>
                    <span className='title'>People</span>
                    <span className='content'>{featuredResult.people}</span>
                    <span className='title'>Department</span>
                    <span className='content'>{featuredResult.department}</span>
                    <span className='title'>Division</span>
                    <span className='content'>{featuredResult.division}</span>
                    <span className='title'>Contact</span>
                    <span className='content'>{featuredResult.contact}</span>
                    <span className='title'>Credit Line</span>
                    <span className='content'>{featuredResult.creditline}</span>
                    {featuredResult.people.map((person) => (
                        <React.Fragment key={person.displayname}>
                            <span className='title'>{person.displayname}</span>
                        </React.Fragment>
                    ))}
                    {featuredResult.images &&
                        featuredResult.images.map((image) => (
                            <section className='photos' key={image.primaryimageurl}>
                                <img src={image.primaryimageurl} alt={image.description} />
                            </section>
                        ))}
                </section>
            </div>
        ) : (
            <main id="feature" />
        )}
    </main>
);
};

export default Feature;
