import axios from "axios";
import React, { useState, useEffect } from "react";
import LoadingSpinner from "./loadingSpinner";
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { action } from '../redux/action';


function mapStateToProps(state) {
    return {
    }
}

const mapDispatchToProps = (dispatch) => ({
    setDetailUser: (obj) => dispatch(action.setDetailUser(obj))
})


export default connect(mapStateToProps, mapDispatchToProps)(function Login(props) {
    const { setDetailUser } = props;
    const navigate = useNavigate();
    const [txt, setTxt] = useState('');
    const [txtPass, setTxtPass] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [numChar, setNumChar] = useState(0);


    const loadAPi = async (e) => {
        e.preventDefault();
        if (txtPass.length > 8 && /\d/.test(txtPass) == true && txt.includes('@')) {
            setIsLoading(true);
            const body = { email: txt, password: txtPass };
            axios.post("https://private-052d6-testapi4528.apiary-mock.com/authenticate", body)
                .then((respose) => {
                    localStorage.setItem("token", respose.data[0].token)
                    setDetailUser(respose.data[0]);
                    navigate("/info");
                    setIsLoading(false);
                });
        }


    }

    const onInputChange = e => {
        const { value } = e.target;
        const re = /^[A-Za-z@]+$/;
        if (value === "" || re.test(value)) {
            setNumChar(txt.length)
            setTxt(value);
        }
        else
            alert("ערך לא תקין")
    }

    const onInputPassChange = e => {
        const { value } = e.target;
        setTxtPass(value);
    }

    return (
        <>

            <form style={{ marginTop: "10%", borderStyle: "groove", borderWidth: "1px", borderColor: "black", width: "30%", marginLeft: "35%", height: "350px" }}>
                <h6>נדרש אותיות באנגלית בלבד</h6>
                <input type="email" dir="rtl" value={txt} onChange={onInputChange} required placeholder="אימייל" style={{ width: "230px", height: "50px" }} />
                <br />
                <h6>נדרש לפחות 8 תוים שיכללו לפחות ספרה אחת</h6>
                <input
                    style={{ width: "230px", height: "50px" }}
                    type='password'
                    dir="rtl"
                    placeholder="סיסמא"
                    value={txtPass}
                    onChange={onInputPassChange}
                    required
                />
                <br />
                <button className="primary" style={{ marginTop: "6%", width: "150px", height: "40px" }} onClick={(e) => loadAPi(e)}>התחברות</button>
                {isLoading ? <LoadingSpinner></LoadingSpinner> : ""}
            </form>
        </>
    )

}
)