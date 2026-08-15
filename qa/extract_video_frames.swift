import AVFoundation
import AppKit
import Foundation

let source = URL(fileURLWithPath: CommandLine.arguments[1])
let outputDirectory = URL(fileURLWithPath: CommandLine.arguments[2], isDirectory: true)
try FileManager.default.createDirectory(at: outputDirectory, withIntermediateDirectories: true)

let asset = AVURLAsset(url: source)
let duration = CMTimeGetSeconds(asset.duration)
let generator = AVAssetImageGenerator(asset: asset)
generator.appliesPreferredTrackTransform = true
generator.maximumSize = CGSize(width: 1400, height: 1400)

print("duration=\(duration)")
let sampleCount = 6

for index in 0..<sampleCount {
    let fraction = Double(index) / Double(sampleCount - 1)
    let seconds = max(0, min(duration - 0.05, duration * fraction))
    let time = CMTime(seconds: seconds, preferredTimescale: 600)
    let image = try generator.copyCGImage(at: time, actualTime: nil)
    let bitmap = NSBitmapImageRep(cgImage: image)
    guard let data = bitmap.representation(using: .png, properties: [:]) else { continue }
    let destination = outputDirectory.appendingPathComponent(String(format: "frame-%02d.png", index))
    try data.write(to: destination)
    print("frame=\(destination.path) size=\(image.width)x\(image.height) time=\(seconds)")
}
