// ignore_for_file: library_private_types_in_public_api

import 'dart:async';
// import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
// import 'package:http/http.dart' as http;

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: LocationTracker(),
    );
  }
}

class LocationTracker extends StatefulWidget {
  const LocationTracker({super.key});

  @override
  _LocationTrackerState createState() => _LocationTrackerState();
}

class _LocationTrackerState extends State<LocationTracker> {
  Timer? timer;
  String status = "Waiting for permission...";
  final String deviceId = "vehicle_001";

  // Replace with backend API later
  final String backendUrl = "backend API";

  @override
  void initState() {
    super.initState();
    _checkPermissionAndStart();
  }

  Future<void> _checkPermissionAndStart() async {
    bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      setState(() => status = "Location services are disabled.");
      return;
    }

    LocationPermission permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        setState(() => status = "Location permission denied.");
        return;
      }
    }

    if (permission == LocationPermission.deniedForever) {
      setState(() => status =
          "Location permanently denied. Enable it from settings.");
      return;
    }

    setState(() => status = "Tracking started...");
    _startTracking();
  }

  void _startTracking() {
    timer = Timer.periodic(const Duration(seconds: 5), (timer) async {
      Position? pos = await _getLocation();
      if (pos != null) {
        print("Latitude: ${pos.latitude}, Longitude: ${pos.longitude}");
        

        //uncomment when backend is ready
        // await _sendLocationToBackend(pos.latitude, pos.longitude);
      }
    });
  }

  Future<Position?> _getLocation() async {
    try {
      return await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high,
      );
    } catch (e) {
      print("Error getting location: $e");
      return null;
    }
  }

//uncomment later on
  // Future<void> _sendLocationToBackend(double lat, double lon) async {
  //   try {
  //     final res = await http.post(
  //       Uri.parse(backendUrl),
  //       headers: {'Content-Type': 'application/json'},
  //       body: jsonEncode({
  //         'deviceId': deviceId,
  //         'latitude': lat,
  //         'longitude': lon,
  //         'timestamp': DateTime.now().toIso8601String(),
  //       }),
  //     );
  //     if (res.statusCode == 200) {
  //       print("Location sent to backend");
  //     } else {
  //       print("Backend error: ${res.statusCode}");
  //     }
  //   } catch (e) {
  //     print("Failed to send location: $e");
  //   }
  // }

  @override
  void dispose() {
    timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Vehicle Tracker")),
      body: Center(
        child: Text(
          status,
          style: const TextStyle(fontSize: 18),
        ),
      ),
    );
  }
}
