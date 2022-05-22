import React, { useState } from 'react'
import axois from 'axios'

const Image = () => {

    const [state, setState] = useState({
        selectedFile: null,
        fileStatus: false
    })



    const getImage = (e) => {
        e.preventDefault();
        setState({ selectedFile: e.target.files[0] })
    }

    const submitImage = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('image', state.selectedFile);
        axois.post('/blog/image', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            console.log(res.statusText);
            setState({ fileStatus: true })
        }).catch(err => console.log(err.message))
    }

    return (
        <div>
            <form>
                <div className="form-group">
                    <input type="file"
                        className="form-control-file"
                        onChange={getImage}
                        name="image"

                    />
                </div>
                <button type="submit" onClick={submitImage} className="btn btn-primary btn-block">Submit</button>
            </form>
        </div>
    )
}

export default Image
