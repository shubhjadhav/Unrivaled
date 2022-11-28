import React, { Component } from "react";
import WordCloud from "react-d3-cloud";

class WordCloudDiv extends Component {
    
    state = {   
        words: [
        {
        "text": "goeiedag",
        "value": 492
        },
        {
        "text": "mir\u00eb dita",
        "value": 32
        },
        {
        "text": "gu\u00e0tertag",
        "value": 797
        },
        {
        "text": "dana esteline",
        "value": 788
        },
        {
        "text": "\u0635\u0628\u0627\u062d \u0627\u0644\u062e\u064a\u0631 ",
        "value": 722
        },
        {
        "text": " salam ",
        "value": 854
        },
        {
        "text": " sab\u00e2hu al khair",
        "value": 682
        },
        {
        "text": "chlomo",
        "value": 345
        },
        {
        "text": "barev",
        "value": 297
        },
        {
        "text": "servus",
        "value": 650
        },
        {
        "text": "salam",
        "value": 519
        },
        {
        "text": "ani sogomen",
        "value": 938
        },
        {
        "text": "me sha'she",
        "value": 757
        },
        {
        "text": "n'dja ar\u00e8 ",
        "value": 608
        },
        {
        "text": " m\u00f4 ar\u00e8",
        "value": 645
        },
        {
        "text": "egunon",
        "value": 851
        },
        {
        "text": "meny\u00e9ga",
        "value": 479
        },
        {
        "text": "vitaju",
        "value": 773
        },
        {
        "text": "namaskar",
        "value": 560
        },
        {
        "text": "ass-iyessbh\u00e8ne ",
        "value": 16
        },
        {
        "text": " ass ameggaz ",
        "value": 847
        },
        {
        "text": " azul",
        "value": 496
        },
        {
        "text": "(KANURI) inda wadou",
        "value": 855
        },
        {
        "text": "ayo",
        "value": 140
        },
        {
        "text": "ka tiana",
        "value": 852
        },
        {
        "text": "zdravo (\"hi\")",
        "value": 946
        },
        {
        "text": "demat",
        "value": 187
        },
        {
        "text": "\u0434\u043e\u0431\u044a\u0440 \u0434\u0435\u043d ",
        "value": 95
        },
        {
        "text": " \u0417\u0434\u0440\u0430\u0432\u0435\u0439",
        "value": 582
        },
        {
        "text": "mingalaba",
        "value": 578
        },
        {
        "text": "bon dia ",
        "value": 495
        },
        {
        "text": " hola",
        "value": 295
        },
        {
        "text": "hafa adai",
        "value": 171
        },
        {
        "text": "osiyo",
        "value": 230
        },
        {
        "text": "(MANDARIN) \u4f60\u597d ",
        "value": 537
        },
        {
        "text": " \u60a8\u597d",
        "value": 812
        },
        {
        "text": "myttyn da",
        "value": 441
        },
        {
        "text": "bonghjornu ",
        "value": 188
        },
        {
        "text": " salutu",
        "value": 174
        },
        {
        "text": "bok ",
        "value": 470
        },
        {
        "text": " dobar dan",
        "value": 72
        },
        {
        "text": "dobr\u00fd den",
        "value": 543
        },
        {
        "text": "goddag ",
        "value": 887
        },
        {
        "text": " hej",
        "value": 664
        },
        {
        "text": "sal\u00e2m",
        "value": 22
        },
        {
        "text": "mat ni kani",
        "value": 965
        },
        {
        "text": "anissoroma",
        "value": 308
        },
        {
        "text": "alapiale",
        "value": 176
        },
        {
        "text": "goede morgen ",
        "value": 148
        },
        {
        "text": " goede middag ",
        "value": 175
        },
        {
        "text": " goede avond",
        "value": 965
        },
        {
        "text": "\u00e9kooni",
        "value": 393
        },
        {
        "text": "hello",
        "value": 237
        },
        {
        "text": "bonan tagon ",
        "value": 322
        },
        {
        "text": " saluton",
        "value": 860
        },
        {
        "text": "tere ",
        "value": 312
        },
        {
        "text": " tere hommikust",
        "value": 294
        },
        {
        "text": "mbolo",
        "value": 667
        },
        {
        "text": "hey",
        "value": 557
        },
        {
        "text": "yadra",
        "value": 310
        },
        {
        "text": "hyv\u00e4\u00e4 p\u00e4iv\u00e4\u00e4",
        "value": 174
        },
        {
        "text": "hoeien nuh'nt",
        "value": 423
        },
        {
        "text": "bonjour",
        "value": 879
        },
        {
        "text": "ha ",
        "value": 116
        },
        {
        "text": " goeie ",
        "value": 799
        },
        {
        "text": " hoi",
        "value": 600
        },
        {
        "text": "bondi",
        "value": 718
        },
        {
        "text": "diarama",
        "value": 20
        },
        {
        "text": "ola",
        "value": 103
        },
        {
        "text": "bonjou ",
        "value": 215
        },
        {
        "text": " salu",
        "value": 206
        },
        {
        "text": "gamarjoba",
        "value": 724
        },
        {
        "text": "hallo ",
        "value": 158
        }
        ]
    }

    render(){
        return (
            <div>
                <WordCloud
                    data={this.state.words}
                    fontSize={(word) => word.value/20}
                    rotate={0}
                />
            </div>
        );
    }
}

export default WordCloudDiv;
