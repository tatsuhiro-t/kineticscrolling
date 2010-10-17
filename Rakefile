require 'rake/clean'

CLEAN.include("src/kineticscrolling_compiled.js")

desc "Compiles JavaScript file."
task "compile" => ["src/kineticscrolling_compiled.js"]

file "src/kineticscrolling_compiled.js" => ["src/kineticscrolling.js"] do
  sh "java -jar google-closure/compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS --js src/kineticscrolling.js --externs google_maps_api_v3.js --externs src/extern.js --js_output_file src/kineticscrolling_compiled.js"
end
