/**
 * @author Stephane [stephane_for_test@gmail.com]
 * @copyright Crown Copyright 2022
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
// import OperationError from "../errors/OperationError.mjs";
import Utils from "../Utils.mjs";
import { toHexFast } from "../lib/Hex.mjs";
import {runHash} from "../lib/Hash.mjs";


/**
 * X963KDF operation
 */
class X963KDF extends Operation {

    /**
     * X963KDF constructor
     */
    constructor() {
        super();

        this.name = "X963KDF";
        this.module = "Crypto";
        this.description = "The EVP_KDF-X963 algorithm implements the key derivation function (X963KDF). X963KDF is used by Cryptographic Message Syntax (CMS) for EC KeyAgreement, to derive a key using input such as a shared secret key and shared info.";
        this.infoURL = "https://www.openssl.org/docs/man3.0/man7/EVP_KDF-X963.html";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Shared Info",
                "type": "toggleString",
                "value": "",
                "toggleValues": ["Hex", "UTF8", "Latin1", "Base64"]
            },
            {
                "name": "Key Size",
                "type": "option",
                "value": ["64"]
            },
            {
                "name": "Input",
                "type": "option",
                "value": ["Hex", "UTF8", "Latin1", "Base64"]
            },
            {
                "name": "Output",
                "type": "option",
                "value": ["Hex", "Raw"]
            }
        ];
    }


    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const Info = Utils.convertToByteString(args[0].string, args[0].option),
            keySize = args[1],
            inputType = args[2],
            outputType = args[3];

        const Key = Utils.convertToByteString(input, inputType);
        const sharedKey = new Uint8Array(Utils.strToArrayBuffer(Key));
        const sharedInfo = new Uint8Array(Utils.strToArrayBuffer(Info));
        const digestLen = 32;
        const rounds = 64;

        const maxCount = Math.ceil(keySize/digestLen);
        let result = new Uint8Array(0);
        for (let count = 1; count < maxCount + 1; count++) {
            const counter = Buffer.allocUnsafe(4);
            counter.writeUInt32BE(count, 0);
            const current = Buffer.concat([sharedKey, counter, sharedInfo]);
            const hash = new Uint8Array(Utils.strToArrayBuffer(Utils.convertToByteString(runHash("sha256", current, {rounds: rounds}), "Hex")));
            result = Buffer.concat([result, hash]);
        }
        const derivedKey = result.slice(0, keySize);

        if (outputType === "Hex") {
            return toHexFast(derivedKey);
        } else {
            return Utils.arrayBufferToStr(derivedKey);
        }
    }

}

export default X963KDF;
