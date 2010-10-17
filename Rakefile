require 'rake/clean'

CLEAN.include("src/kineticscrolling_compiled.js")

desc <<-eos
Compiles JavaScript file.
You need to put closure compiler compiler.jar in google-closure directory.
You also need to put google_maps_api_v3.js from
http://code.google.com/p/closure-compiler/source/browse/#svn/trunk/contrib/externs
in google-closure/externs directory.
eos

task "compile" => ["src/kineticscrolling_compiled.js"]

file "src/kineticscrolling_compiled.js" => ["src/kineticscrolling.js"] do
  sh "java -jar google-closure/compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS --js src/kineticscrolling.js --externs google-closure/externs/google_maps_api_v3.js --externs google-closure/externs/extern.js --js_output_file src/kineticscrolling_compiled.js"
end
