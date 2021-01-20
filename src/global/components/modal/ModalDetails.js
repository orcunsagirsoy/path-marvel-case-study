import React from 'react';
import ItemList from './ItemList'
import LoadingSpinner from '../loader/LoadingSpinner';
import Modal from 'react-bootstrap/Modal'
import ModalTitle from 'react-bootstrap/ModalTitle'
import Button from 'react-bootstrap/Button'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'


const ModalDetails = ({ show, onHide, details, isComicsLoaded, dispatch, info, myTeam }) => {

    const itemList = {
        overflowY: 'auto',
        scrollBehavior: 'smooth',
        border: '3px hidden black',
        maxHeight: '40vh'
    }

    const { name, description, thumbnail } = details
    const { comics, series, stories } = info
    const image = (Object.keys(details).length) ? `${thumbnail.path}/standard_amazing.${thumbnail.extension}` : null

    return (
        <Modal
            show={show}
            onHide={onHide}
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered
        >
            <Modal.Header closeButton>
                <ModalTitle className='flex justify-center items-center'>
                    <ModalTitle className='f6 flex justify-center items-center '>
                        {image && (
                            <img
                                alt={name}
                                src={image}
                                className='br-100'
                                width={120}
                                height={120}
                            />
                        )}
                        <ModalTitle className='f6 flex pl3 items-center flex-wrap' style={{ overflowY: 'auto' }}>
                            {!description ? 'No description available' : description}
                        </ModalTitle >
                    </ModalTitle>
                </ModalTitle>
            </Modal.Header>
            <Modal.Body>
                <h5>{name}</h5>
                <div className='f5 ma2'>
                    {isComicsLoaded === 'false' ? <LoadingSpinner inHome={false} /> :
                        (<Tabs defaultActiveKey='comics' id='uncontrolled-tab' variant='tabs' >
                            <Tab eventKey='comics' title={`Comics`} style={itemList}>
                                <ItemList list={comics} />
                            </Tab>
                            <Tab eventKey='series' title={`Series`} style={itemList}>
                                <ItemList list={series} />
                            </Tab>
                            <Tab eventKey='stories' title={`Stories`} style={itemList}>
                                <ItemList list={stories} />
                            </Tab>
                        </Tabs>)}
                </div>
            </Modal.Body>
            <Modal.Footer className='flex w-100 justify-between'>
                <div className='hide-child child w-auto o-0'>filler</div>
                <Button className='btn-dark w-auto' onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDetails;
