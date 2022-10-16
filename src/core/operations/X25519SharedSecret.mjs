/**
 * @author Stephane [stephane_for_test@gmail.com]
 * @copyright Crown Copyright 2022
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import Utils from "../Utils.mjs";
import { toHexFast } from "../lib/Hex.mjs";
import X25519 from "../lib/x25519.mjs";

/**
 * X25519SharedSecret operation
 */
class X25519SharedSecret extends Operation {

    /**
     * X25519SharedSecret constructor
     */
    constructor() {
        super();

        this.name = "X25519 Shared Secret";
        this.module = "Crypto";
        this.description = "X25519 is an elliptic curve Diffie-Hellman key exchange using Curve25519. It allows two parties to jointly agree on a shared secret using an insecure channel.";
        this.infoURL = "https://github.com/CryptoEsel/js-x25519";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Private Key",
                "type": "toggleString",
                "value": "",
                "toggleValues": ["Hex", "UTF8", "Latin1", "Base64"]
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
        const key = Utils.convertToByteString(args[0].string, args[0].option),
            inputType = args[1],
            outputType = args[2];

        const inputKey = Utils.convertToByteString(input, inputType);
        const secretKey = Utils.strToArrayBuffer(key);
        const publicKey = Utils.strToArrayBuffer(inputKey);
        const sharedKey = X25519.getSharedKey(new Uint8Array(secretKey), new Uint8Array(publicKey));

        if (outputType === "Hex") {
            return toHexFast(sharedKey);
        } else {
            return Utils.arrayBufferToStr(sharedKey);
        }
    }
}

export default X25519SharedSecret;
