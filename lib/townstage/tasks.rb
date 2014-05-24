namespace :townstage do
  path = 'sass/townstage'

  src = File.expand_path('../../', File.dirname(__FILE__))
  dest = File.expand_path('.')

  src_files = FileList.new(File.join(src, 'sass', '**', '*.scss'))
  dest_files = src_files.sub(src, dest)

  task install: [path] + dest_files do
    puts "Installed Townstage Bootstrap."
  end

  directory 'sass/townstage'

  dest_files.each do |file|
    file file => file.sub(dest, src) do |t|
      `cp #{t.source} #{t.name}`
      puts "Copied #{t.name.sub(dest + '/sass/', '')}"
    end
  end
end
