## Variety plugin - Latex output

This plugin outputs results of Variety analysis in [Latex](https://en.wikibooks.org/wiki/LaTeX/Tables) format.

```
\documentclass{article}
\begin{document}
    \begin{center}
         \begin{tabular}{|c|c|c|c|} \hline
            key & types & occurrences & percents \\ \hline
            \_id & ObjectId & 5 & 100.0 \\ \hline
            name & String & 5 & 100.0 \\ \hline
            bio & String & 3 & 60.0 \\ \hline
            birthday & String & 2 & 40.0 \\ \hline
            pets & Array,String & 2 & 40.0 \\ \hline
            someBinData & BinData-old & 1 & 20.0 \\ \hline
            someWeirdLegacyKey & String & 1 & 20.0 \\ \hline
        \end{tabular}
    \end{center}
\end{document}
```

## How to run plugin
First download the index.js file from this Github repository.

```
wget https://raw.githubusercontent.com/todvora/variety-plugin-latex/master/index.js
```

Then pass the plugin path in Variety parameters like this:

```
mongo test --eval "var collection = 'users'; var plugins='/path/to/plugin/index.js';" variety.js
```

If you downloaded the plugin inside the same directory, where the is located also ```variety.js```,
you can omit the path and call Variety like this:

```
mongo test --eval "var collection = 'users'; var plugins='index.js';" variety.js
```

## Number of columns
By default all the data columns are printed. If you are interested only in first *N* columns, adjust the plugin configuration:
```
mongo test --eval "var collection = 'users'; var plugins='index.js|numColumns=2';" variety.js
```
This will output only the first two columns (name, types).

## Hacking
If you want to hack on this plugin, just fork this repository and change index.js content.

Please see also the test suite. You can run the tests from your browser or console (with node.js). The tests are writen in [Jasmine framework](https://jasmine.github.io/1.3/introduction.html).

### Console runner
You have to install node / npm first. Then you should install the test dependencies:

```
npm install -g jasmine-node jshint
```

Now you can run the test suite by calling
```
npm test
```

### Browser tests
If you don't want or can't run console tests, you can use the included HTML test runner. Open in your browser ```tests.html``` located inside this repository. You should see the current results of tests. To repeat execution  just reload the page.
