from serial import Serial
import serial.tools.list_ports as list_ports

def find_arduino():
    for port_info in list_ports.comports():
        print(port_info)
        
def print_input():
    ser = Serial('/dev/ttyUSB0', 9600, timeout=1)
    ser.flush()
    
    while True:
        if ser.in_waiting > 0:
            line = ser.read_until('\n').rstrip()
            print(line)
            
if __name__ == '__main__':
    ## find_arduino()
    print_input()