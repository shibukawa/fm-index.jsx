/**
 * This is a JSX version of shellinford library:
 * https://code.google.com/p/shellinford/
 *
 * License: http://shibu.mit-license.org/
 */

import "test-case.jsx";
import "fm-index.jsx";
import "binary-io.jsx";
import "console.jsx";

class Pair
{
    var first : string;
    var second : int;
    function constructor (_first : string, _second : int)
    {
        this.first = _first;
        this.second = _second;
    }
}

class _Test extends TestCase
{
    var str : string;
    var rd : Map.<int>;
    var pd : int[];
    var sd : string[];
    var didd : int[];
    var docd : string[];
    var fm : FMIndex;

    override function setUp () : void
    {
        this.str = "";
        this.sd = [] : string[];
        this.rd = {} : Map.<int>;
        this.pd = [] : int[];
        this.didd = [] : int[];
        this.docd = [] : string[];
        this.fm = new FMIndex();

        this.docd.push("abracadabra");
        this.docd.push("mississippi");
        this.docd.push("abracadabra mississippi");

        var did = 0;
        for (var i in this.docd)
        {
            var doc = this.docd[i];
            this.str += doc;
            for (var j = 0; j < doc.length; j++){
                this.didd.push(did);
            }
            this.fm.push(doc);
            did++;
        }

        this.didd.push(did);
        this.fm.build(25, null);
        this.str += String.fromCharCode(0); // end_marker
        for (var i = 0; i < this.str.length; i++)
        {
            for (var j = 1; j <= (this.str.length - i); j++)
            {
                var s = this.str.slice(i, i + j);
                if (this.rd[s] == null)
                {
                    this.rd[s] = 1;
                }
                else
                {
                    this.rd[s]++;
                }
            }
        }

        var v = [] : Pair[];
        for (var i = 0; i < this.str.length; i++)
        {
            var s = this.str.slice(i) + this.str.slice(0, i);
            v.push(new Pair(s, i));
        }
        v.sort(function (a: Pair, b: Pair) : number {
            if (a.first < b.first)
            {
                return -1;
            }
            else if (a.first > b.first)
            {
                return 1;
            }
            return a.second - b.second;
        });
        for (var i in v)
        {
            this.pd.push(v[i].second);
        }
        for (var i = 0; i < this.str.length; i++)
        {
            this.sd.push(this.str.slice(i).replace(String.fromCharCode(0), ''));
        }
    }

    function test_size () : void
    {
        this.expect(this.fm.size()).toBe(this.str.length);
    }

    function test_getRows () : void
    {
        for (var i = 0; i < this.fm.size(); i++)
        {
            for (var j = i + 1; j < this.fm.size(); j++)
            {
                var s = this.str.slice(i, j);
                this.expect(this.fm.getRows(s)).toBe(this.rd[s]);
            }
        }
    }

    function test_getPosition () : void
    {
        for (var i = 0; i < this.pd.length; i++)
        {
            this.expect(this.fm.getPosition(i)).toBe(this.pd[i]);
        }
    }

    function test_getSubstring () : void
    {
        for (var i = 0; i < this.sd.length; i++)
        {
            var actual = this.fm.getSubstring(i, this.fm.size());
            var expect = this.sd[i];
            this.expect(actual).toBe(expect);
        }
    }

    function test_getSubstring2 () : void
    {
        this.fm = new FMIndex();
        this.fm.push("abracadabra");
        this.fm.push("mississippi");
        this.fm.push("abracadabra mississippi");
        this.fm.build(3);
        this.expect(this.fm.getSubstring(0, 11)).toBe('abracadabra');
        this.expect(this.fm.getSubstring(11, 11)).toBe('mississippi');
        this.expect(this.fm.getSubstring(22, 23)).toBe('abracadabra mississippi');
    }

    function test_getSubstringWithCompressedWord () : void
    {
        function encode (str : string) : string
        {
            var codes = ['\u0000', '\u0001', '\u0003', 'a', 'b', 'r', 'c', 'd', 'm', 'i', 's', 'p', ' '];
            var result = '';
            for (var i = 0; i < str.length; i++)
            {
                result += String.fromCharCode(codes.indexOf(str.charAt(i)));
            }
            return result;
        }

        function decode (str : string) : string
        {
            var codes = ['\u0000', '\u0001', '\u0003', 'a', 'b', 'r', 'c', 'd', 'm', 'i', 's', 'p', ' '];
            var result = '';
            for (var i = 0; i < str.length; i++)
            {
                result += codes[str.charCodeAt(i)];
            }
            return result;
        }

        this.fm = new FMIndex();
        this.fm.push(encode("abracadabra"));
        this.fm.push('\u0001');
        this.fm.push(encode("mississippi"));
        this.fm.push('\u0001');
        this.fm.push(encode("abracadabra mississippi"));
        this.fm.push('\u0001');
        this.fm.build(3);
        this.expect(decode(this.fm.getSubstring(0, 11))).toBe('abracadabra');
        this.expect(decode(this.fm.getSubstring(12, 11))).toBe('mississippi');
        this.expect(decode(this.fm.getSubstring(24, 23))).toBe('abracadabra mississippi');
    }

    function test_getSubstringBeforeBuild () : void
    {
        this.fm = new FMIndex();
        this.fm.push("abracadabra");
        this.fm.push('\u0001');
        this.fm.push("mississippi");
        this.fm.push('\u0001');
        this.fm.push("abracadabra mississippi");
        this.fm.push('\u0001');
        this.expect(this.fm.getSubstring(0, 11)).toBe('abracadabra');
        this.expect(this.fm.getSubstring(12, 11)).toBe('mississippi');
        this.expect(this.fm.getSubstring(24, 23)).toBe('abracadabra mississippi');
    }

    function test_getPosition_boundary () : void
    {
        try
        {
            this.fm.getPosition(this.fm.size());
            this.fail("fm.getPosition()");
        }
        catch (e : Error)
        {
        }
    }

    function test_getSubstring_boundary () : void
    {
        try
        {
            this.fm.getSubstring(this.fm.size(), 0);
            this.fail("fm.getSubstring()");
        }
        catch (e : Error)
        {
        }
    }

    function test_search () : void
    {
        var results = this.fm.search("ssi");
        this.expect(results.length).toBe(4);
        for (var i = 0; i < results.length; i++)
        {
            this.expect(this.fm.getSubstring(results[i], 3)).toBe('ssi');
        }
    }

    function test_dump_load_and_size () : void
    {
        var dump = new BinaryOutput();
        this.fm.dump(dump);
        this.fm.load(new BinaryInput(dump.result()));

        this.expect(this.fm.size()).toBe(this.str.length);
    }

    function test_dump_load_and_getRows () : void
    {
        var dump = new BinaryOutput();
        this.fm.dump(dump);
        this.fm.load(new BinaryInput(dump.result()));

        for (var i = 0; i < this.fm.size(); i++)
        {
            for (var j = i + 1; j < this.fm.size(); j++)
            {
                var s = this.str.slice(i, j);
                this.expect(this.fm.getRows(s)).toBe(this.rd[s]);
            }
        }
    }

    function test_dump_load_and_getPosition () : void
    {
        var dump = new BinaryOutput();
        this.fm.dump(dump);
        this.fm.load(new BinaryInput(dump.result()));

        for (var i = 0; i < this.fm.size(); i++)
        {
            this.expect(this.fm.getPosition(i)).toBe(this.pd[i]);
        }
    }

    function test_dump_load_and_getSubstring () : void
    {
        var dump = new BinaryOutput();
        this.fm.dump(dump);
        this.fm.load(new BinaryInput(dump.result()));

        for (var i = 0; i < this.fm.size(); i++)
        {
            this.expect(this.fm.getSubstring(i, this.fm.size())).toBe(this.sd[i]);
        }
    }

    function test_dump_load_and_getPosition_boundary () : void
    {
        var dump = new BinaryOutput();
        this.fm.dump(dump);
        this.fm.load(new BinaryInput(dump.result()));

        try
        {
            this.fm.getPosition(this.fm.size());
            this.fail("fm.getPosition()");
        }
        catch (e : Error)
        {
        }
    }

    function test_dump_load_and_getSubstring_boundary () : void
    {
        var dump = new BinaryOutput();
        this.fm.dump(dump);
        this.fm.load(new BinaryInput(dump.result()));

        try
        {
            this.fm.getSubstring(this.fm.size(), 0);
            this.fail("fm.getSubstring()");
        }
        catch (e : Error)
        {
        }
    }
}
