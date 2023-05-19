import "./form.scss";

const Form = () => {
    return (
        <>
            <label className="form__title">Insert the link</label>
            <div className="form__input">
                <input className="form__text" placeholder="https://" />
                <button className="form__button"></button>
            </div>
        </>
    );
};

export default Form;