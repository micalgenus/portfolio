#############################################################################
#
# Modified version of jekyllrb Rakefile
# https://github.com/jekyll/jekyll/blob/master/Rakefile
#
#############################################################################

require 'rake'
require 'date'
require 'yaml'

USERNAME = "micalgenus"
REPO = "micalgenus.github.io"
SOURCE_BRANCH = "master"
DESTINATION_BRANCH = "master"
DESTINATION_DIR = "react"

def check_destination
  unless Dir.exist? DESTINATION_DIR
    sh "git clone https://$GITHUB_TOKEN@github.com/#{USERNAME}/#{REPO}.git #{DESTINATION_DIR}"
  end
end

namespace :site do
  desc "Generate the site"
  task :build do
    check_destination
    sh "yarn && yarn build"
  end

  desc "Generate the site and serve locally"
  task :serve do
    check_destination
    sh "yarn && yarn start"
  end

  desc "Generate the site and push changes to remote origin"
  task :deploy do
    # Detect pull request
    if ENV['TRAVIS_PULL_REQUEST'].to_s.to_i > 0
      puts 'Pull request detected. Not proceeding with deploy.'
      exit
    end

    # Configure git if this is run in Travis CI
    if ENV["TRAVIS"]
      sh "git config --global user.name $GIT_NAME"
      sh "git config --global user.email $GIT_EMAIL"
      sh "git config --global push.default simple"
    end

    # Make sure destination folder exists as git repo
    check_destination

    sh "git checkout #{SOURCE_BRANCH}"
    Dir.chdir(DESTINATION_DIR) { sh "git checkout #{DESTINATION_BRANCH}" }

    # Generate the site
    sh "yarn build"

    # Commit and push to github
    sha = `git log`.match(/[a-z0-9]{40}/)[0]
    Dir.chdir(DESTINATION_DIR) do
      # check if there is anything to add and commit, and pushes it
      sh "if [ -n '$(git status)' ]; then
            git add --all .;
            git commit -m 'Updating to #{USERNAME}/#{REPO}@#{sha}.';
            git push https://$GITHUB_TOKEN@github.com/#{USERNAME}/#{USERNAME}.github.io.git #{DESTINATION_BRANCH} --quiet ;
         fi"
      puts "Pushed updated branch #{DESTINATION_BRANCH} to GitHub Pages"
    end
  end
end