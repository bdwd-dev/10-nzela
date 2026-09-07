import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

void main() {
  runApp(const NzelaApp());
}

class NzelaApp extends StatelessWidget {
  const NzelaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'NZELA',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFFFF6B35)),
      ),
      darkTheme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFFFF6B35),
          brightness: Brightness.dark,
        ),
      ),
      themeMode: ThemeMode.dark,
      home: const HomeScreen(),
    );
  }
}

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentIndex = 0;
  Map<String, dynamic> stats = {};

  @override
  void initState() {
    super.initState();
    _loadStats();
  }

  Future<void> _loadStats() async {
    try {
      final res = await http.get(Uri.parse('http://localhost:3010/api/stats'));
      if (res.statusCode == 200) {
        setState(() => stats = json.decode(res.body));
      }
    } catch (e) {
      // Offline mode
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('🚌 NZELA', style: TextStyle(fontWeight: FontWeight.bold)),
        centerTitle: true,
      ),
      body: _currentIndex == 0
          ? _buildHome()
          : _currentIndex == 1
              ? _buildAgent()
              : _buildKibalu(),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (i) => setState(() => _currentIndex = i),
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.dashboard), label: 'Dashboard'),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Agent'),
          BottomNavigationBarItem(icon: Icon(Icons.developer_board), label: 'Kibalu'),
        ],
      ),
    );
  }

  Widget _buildHome() {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        const Text(
          'YB Group Ltd — SaaS Transport',
          style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 8),
        Text(
          'Gestion intelligente de flotte en temps réel',
          style: TextStyle(color: Colors.grey[400]),
        ),
        const SizedBox(height: 24),
        GridView.count(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          crossAxisCount: 2,
          crossAxisSpacing: 12,
          mainAxisSpacing: 12,
          children: [
            _StatCard(icon: Icons.directions_bus, value: '${stats['buses'] ?? 0}', label: 'Bus actifs'),
            _StatCard(icon: Icons.people, value: '${stats['agents'] ?? 0}', label: 'Agents'),
            _StatCard(icon: Icons.receipt, value: '${stats['transactions'] ?? 0}', label: 'Transactions'),
            _StatCard(icon: Icons.attach_money, value: '${stats['revenue'] ?? 0} F', label: 'Recettes'),
          ],
        ),
      ],
    );
  }

  Widget _buildAgent() {
    return const Center(child: Text('App Agent — Recharge cartes YB Pay'));
  }

  Widget _buildKibalu() {
    return const Center(child: Text('Simulateur Kibalu Box — LED + IPS'));
  }
}

class _StatCard extends StatelessWidget {
  final IconData icon;
  final String value;
  final String label;

  const _StatCard({required this.icon, required this.value, required this.label});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, color: Theme.of(context).colorScheme.primary, size: 32),
            const SizedBox(height: 8),
            Text(value, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            Text(label, style: TextStyle(color: Colors.grey[400], fontSize: 12)),
          ],
        ),
      ),
    );
  }
}
