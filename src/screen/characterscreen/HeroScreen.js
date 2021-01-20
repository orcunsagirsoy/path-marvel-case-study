import React, { useState } from 'react';
import Card from '../../global/components/card/Card';
import MarvelAPI from '../../services/MarvelAPI'
import LoadingSpinner from '../../global/components/loader/LoadingSpinner';
import MarvelPagination from '../pagination/MarvelPagination';
import ErrorLogo from '../../assets/images/error404.svg'

const HeroScreen = ({ characters, setModal, dispatch, currentPage, setCurrentPage }) => {

    const [characterPerPage] = useState(3);
    const { items, myteam } = characters

    //Fetch all characters Comics, and Series during opning of modal
    //Fetch is attached when character Card is clicked
    const getCharacterComicsStoriesSeries = async (char) => {

        setModal(true)
        dispatch({
            type: 'GET_CURRENT_REQUEST',
            payload: char,
            isComicsLoaded: 'false'
        });

        try {
            const data = await Promise.all([
                MarvelAPI.getComicsByCharacter(char.id),
                MarvelAPI.getSeriesByCharacter(char.id),
                MarvelAPI.getStoriesByCharacter(char.id)
            ])

            const responseComics = await data[0].json()
            const responseSeries = await data[1].json()
            const responseStories = await data[2].json()

            dispatch({
                type: 'GET_CURRENT_SUCCESS',
                comics: responseComics.data,
                series: responseSeries.data,
                stories: responseStories.data
            })

        } catch (err) {
            console.log(err)
        }
    }
    // Get current posts
    const indexOfLastCharacter = currentPage * characterPerPage;
    const indexOfFirstCharacter = indexOfLastCharacter - characterPerPage;
    const currentPosts = items.slice(indexOfFirstCharacter, indexOfLastCharacter);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (characters.isLoading) {
        return (
            <LoadingSpinner inHome={true} />
        )
    } else if (characters.isError) {
        return (
            <div className='flex justify-center pt6 pt7-ns'>
                <img className='mw4' src={ErrorLogo} alt='404' />
            </div>
        )
    } else if (characters.items.length === 0) {
        return (
            <div className='f1 flex justify-center pt6 pt7-ns'>
                No Results Found
            </div>
        )
    }

    return (
        <div className='flex flex-row'>
            <div className='flex flex-column justify-center items-center flex-wrap pt6 pt7-ns w-100'>
                <div className='flex flex-wrap justify-center ma4-ns ma1'>
                    {currentPosts.map((element) => {
                        return <Card
                            classname='flex'
                            key={element.id}
                            charDetails={element}
                            onPress={() => getCharacterComicsStoriesSeries(element)}
                        />
                    })}
                </div>
                <MarvelPagination
                    className='flex'
                    characterPerPage={characterPerPage}
                    totalCharacters={items.length}
                    paginate={paginate}
                />
            </div>
        </div>
    )

}
export default HeroScreen