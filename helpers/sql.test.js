const { sqlForPartialUpdate } = require("./sql");


describe("sqlForPartialUpdate", function () {
    test("update 1 item", function () {
        const result = sqlForPartialUpdate({ key1: "value1" }, { key1: "key1", key2: "key2" });
        expect(result).toEqual(
            {
                setCols: '"key1"=$1',
                values: ["value1"]
            });
    });

    test("update 2 items", function () {
        const result = sqlForPartialUpdate({ clarkKent: "superman", loisLane: "reporter" }, { clarkKent: "clark_kent", loisLane: "lois_lane" });
        expect(result).toEqual(
            {
                setCols: '"clark_kent"=$1, "lois_lane"=$2',
                values: ["superman", "reporter"]
            });
    });

});