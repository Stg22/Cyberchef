/**
 * X963KDF tests
 *
 * @author Stephane [stephane_for_test@gmail.com]
 * @copyright Crown Copyright 2022
 * @license Apache-2.0
 */
import TestRegister from "../../lib/TestRegister.mjs";

const DERIVED_KEY = "2ba342cabd2b3b1e5e4e890da11b65f6e2622cb0cdd08204e721c8ea9b95a7c6d9846966fb7cf5fcf11266c5957dea60b83fff2b7c940690a4bfe57b1eb52bd2";
const UE_PUBKEY = "b2e92f836055a255837debf850b528997ce0201cb82adfe4be1f587d07d8457d";
const SHARED_KEY = "028ddf890ec83cdf163947ce45f6ec1a0e3070ea5fe57e2b1f05139f3e82422a";

TestRegister.addTests([
    {
        name: "X963KDF: with 3GPP TS33.501 test values",
        input: SHARED_KEY,
        expectedOutput: DERIVED_KEY,
        recipeConfig: [
            {
                "op": "X963KDF",
                "args": [{string: UE_PUBKEY, option: "Hex"}, "64", "Hex", "Hex"],
            }
        ]
    },
]);
