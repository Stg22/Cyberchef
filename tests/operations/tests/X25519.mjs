/**
 * BCD tests
 *
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 */
import TestRegister from "../../lib/TestRegister.mjs";

const HN_PRIVKEY = "c53c22208b61860b06c62e5406a7b330c2b577aa5558981510d128247d38bd1d";
const UE_PUBKEY = "b2e92f836055a255837debf850b528997ce0201cb82adfe4be1f587d07d8457d";
const SHARED_KEY = "028ddf890ec83cdf163947ce45f6ec1a0e3070ea5fe57e2b1f05139f3e82422a";

TestRegister.addTests([
    {
        name: "X25519 Shared Secret: with 3GPP TS33.501 test values",
        input: UE_PUBKEY,
        expectedOutput: SHARED_KEY,
        recipeConfig: [
            {
                "op": "X25519 Shared Secret",
                "args": [{string: HN_PRIVKEY, option: "Hex"}, "Hex", "Hex"],
            }
        ]
    },
]);
