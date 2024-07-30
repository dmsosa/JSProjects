import { useEffect, useState } from "react";
import quotesJSON from "../assets/quotes.json";
function Message() {

    const [ quote, setQuote ] = useState();
    const [ translatedMessage, setTranslatedMessage ] = useState();
    const [ author, setAuthor ] = useState();


//zufalliges Seite griffen
//von Seite set zufallige Zitaten

    useEffect(() => {

        let randIndex;
        randIndex = Math.floor(Math.random() * quotesJSON.pages.length);

        const quotePage = quotesJSON.pages[randIndex];
        const results = quotePage.results;

        randIndex = Math.floor(Math.random() * results.length);

        var selectedQuote = JSON.parse(results[randIndex]);
        setAuthor(selectedQuote.author);
        setQuote(selectedQuote.text);

            setInterval(() => {
                randIndex = Math.floor(Math.random() * results.length);

                var selectedQuote = JSON.parse(results[randIndex]);
                setAuthor(selectedQuote.author);
                setQuote(selectedQuote.text);
            }, 180000)
    }, [])

    return (
            <div className="meditation-message">
                    <p className="message-content">
                        {quote}
                    </p>
                    <p className="message-content translated">
                        {translatedMessage}
                    </p>
                    <span>{author}</span>
            </div>
    )
}

export default Message;